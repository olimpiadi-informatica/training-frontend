import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { type ForumPost, searchForumPosts } from "~/lib/forum";

type Props = {
  taskName: string;
  taskTitle: string;
  taskUrl: string;
};

export async function ForumPosts({ taskName, taskTitle, taskUrl }: Props) {
  const { _ } = useLingui();

  const posts = await searchForumPosts(taskTitle);

  if (!posts.length) {
    return (
      <div className="text-center">
        <Trans>Nessun post trovato.</Trans>
        <br />
        <NewPost taskName={taskName} taskTitle={taskTitle} taskUrl={taskUrl} />
      </div>
    );
  }

  const avatar = (post: ForumPost, scale: number) =>
    post.avatarUrl.replace("{size}", String(48 * scale));

  return (
    <div className="grid gap-3">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.url}
          className="bg-base-200 rounded-box p-4 grid grid-cols-[auto,1fr] gap-4"
          target="_blank"
          rel="noreferrer">
          <div className="avatar p-1.5">
            <div className="rounded-lg size-12">
              <img
                src={avatar(post, 1)}
                srcSet={`${avatar(post, 1)} 1x, ${avatar(post, 2)} 2x, ${avatar(post, 3)} 3x`}
                alt={_(msg`Foto profilo di ${post.username}`)}
              />
            </div>
          </div>
          <div>
            <div className="text-lg">
              <span className="link link-info">{post.title}</span>
            </div>
            <div>{post.description}</div>
          </div>
        </a>
      ))}
      <div className="text-center">
        <NewPost taskName={taskName} taskTitle={taskTitle} taskUrl={taskUrl} />
      </div>
    </div>
  );
}

function NewPost({ taskName, taskTitle, taskUrl }: Props) {
  const url = new URL("https://forum.olinfo.it/new-topic");
  url.searchParams.append("title", `Aiuto per ${taskTitle} (${taskName})`);
  url.searchParams.append(
    "body",
    `\
Ciao a tutti, ho bisogno di aiuto per risolvere il problema [${taskTitle}](https://training.olinfo.it${taskUrl}).

[SPIEGARE COSA NON FUNZIONA QUI]

Ecco il mio codice:
\`\`\`cpp
// INSERISCI QUI IL TUO CODICE
\`\`\`

Grazie mille in anticipo!`,
  );
  url.searchParams.append("category", "Aiuto");

  return (
    <a href={url.href} target="_blank" rel="noreferrer" className="link link-info">
      <Trans>Crea un nuovo post</Trans>
    </a>
  );
}
