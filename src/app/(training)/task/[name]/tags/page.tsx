"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { type MouseEvent, type Ref, forwardRef, useRef, useState } from "react";

import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Form,
  FormFieldError,
  Menu,
  Modal,
  SelectField,
  SubmitButton,
  useNotifications,
} from "@olinfo/react-components";
import {
  type Tag,
  type Task,
  addTag,
  getEventTags,
  getTags,
  getTask,
  removeTag,
} from "@olinfo/training-api";
import { sortBy } from "lodash-es";
import { Eye, SquarePlus, Trash2 } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";

import { H2 } from "~/components/header";

import { Skeleton } from "./skeleton";

type Props = {
  params: { name: string };
};

export default function Page({ params }: Props) {
  const { _ } = useLingui();

  const modalRef = useRef<HTMLDialogElement>(null);

  const { data: task } = useSWR<Task, Error, [string, string]>(
    ["api/task", params.name],
    ([, ...params]) => getTask(...params),
    { revalidateIfStale: false },
  );

  const { data: eventTags } = useSWR("api/event-tags", getEventTags, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const isTagsPage = usePathname().endsWith("/tags");

  if (!task || !eventTags) return <Skeleton isTagsPage={isTagsPage} />;

  const tags = sortBy(task.tags, [(t) => !eventTags.includes(t.name), "name"]);

  return (
    <div>
      <H2 className="mb-2">
        <Trans>Tags</Trans>
      </H2>
      <Menu fallback={_(msg`Nessun tag`)}>
        {tags.map((tag) => (
          <li key={tag.name}>
            {tag.can_delete || eventTags.includes(tag.name) ? (
              <BaseTag tag={tag} />
            ) : (
              <HiddenTag tag={tag} />
            )}
          </li>
        ))}
      </Menu>
      {isTagsPage && (
        <div className="mt-4 flex justify-center">
          <button
            className="btn btn-primary"
            onClick={() => modalRef.current?.showModal()}
            type="button">
            <SquarePlus size={22} /> <Trans>Aggiungi tag</Trans>
          </button>
          <AddTagModal ref={modalRef} taskName={params.name} />
        </div>
      )}
    </div>
  );
}

function BaseTag({ tag }: { tag: Tag }) {
  const { name: taskName } = useParams();
  const { notifySuccess } = useNotifications();
  const { mutate } = useSWRConfig();
  const { _ } = useLingui();

  const remove = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await removeTag(taskName as string, tag.name);
    await mutate(["api/task", taskName]);
    notifySuccess(_(msg`Tag rimosso con successo`));
  };

  return (
    <Link href={`/tasks/1?tag=${tag.name}`} className="font-mono">
      {tag.name}
      {tag.can_delete && (
        <button className="btn btn-ghost btn-xs justify-self-end" onClick={remove} type="button">
          <Trash2 size={18} />
        </button>
      )}
    </Link>
  );
}

function HiddenTag({ tag }: { tag: Tag }) {
  const { _ } = useLingui();

  const [shown, setShown] = useState(false);
  const rand = useRef(Math.round(1e6 ** (Math.random() + 1)));

  if (shown) return <BaseTag tag={tag} />;

  return (
    <button
      className="font-mono"
      onClick={() => setShown(true)}
      aria-label={_(msg`Mostra tag`)}
      type="button">
      <div className="blur-sm" aria-hidden={true}>
        {rand.current}
      </div>
      <div className="mr-px justify-self-end px-2">
        <Eye size={18} />
      </div>
    </button>
  );
}

const AddTagModal = forwardRef(function AddTagModal(
  { taskName }: { taskName: string },
  ref: Ref<HTMLDialogElement> | null,
) {
  const { notifySuccess } = useNotifications();
  const { mutate } = useSWRConfig();
  const { _ } = useLingui();

  const { data: tags } = useSWR("api/tags", getTags, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const options = Object.fromEntries(sortBy(tags).map((tag) => [tag, tag]));

  const submit = async (data: { tag: string }) => {
    try {
      await addTag(taskName, data.tag);
    } catch (err) {
      switch ((err as Error).message) {
        case "The task already has this tag":
          throw new FormFieldError("tag", _(msg`Il task ha già questo tag`));
        default:
          throw err;
      }
    }
    await mutate(["api/task", taskName]);
    notifySuccess(_(msg`Tag aggiunto con successo`));
  };

  return (
    <Modal ref={ref} title={_(msg`Aggiungi tag`)}>
      <Form onSubmit={submit}>
        <SelectField
          field="tag"
          label={_(msg`Tag`)}
          placeholder={_(msg`Seleziona un tag`)}
          options={options}
        />
        <SubmitButton>
          <Trans>Aggiungi</Trans>
        </SubmitButton>
      </Form>
    </Modal>
  );
});
