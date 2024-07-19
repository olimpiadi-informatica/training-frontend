import { Badge, type CategoryBadge, type CategoryId } from "~/lib/algobadge";

export type Users = Record<string, Record<CategoryId, CategoryBadge> | null | undefined>;

export enum BadgeExtra {
  Loading = 100,
  Invalid = 101,
}

export type ExtendedBadge = Badge | BadgeExtra;

export const badgeTypes: ExtendedBadge[] = [
  Badge.None,
  Badge.Bronze,
  Badge.Silver,
  Badge.Gold,
  Badge.Diamond,
  BadgeExtra.Loading,
  BadgeExtra.Invalid,
];

export const badgeColor: Record<ExtendedBadge, string> = {
  [Badge.Diamond]: "#22d3ee",
  [Badge.Gold]: "#fbbf24",
  [Badge.Silver]: "#9ca3af",
  [Badge.Bronze]: "#d97706",
  [Badge.None]: "#374151",
  [Badge.Locked]: "#f87171",
  [BadgeExtra.Invalid]: "#f87171",
  [BadgeExtra.Loading]: "#1f2937",
};

export const badgeName: Record<ExtendedBadge, string> = {
  [Badge.Locked]: "Bloccato",
  [Badge.None]: "Nessuno",
  [Badge.Bronze]: "Bronzo",
  [Badge.Silver]: "Argento",
  [Badge.Gold]: "Oro",
  [Badge.Diamond]: "Diamante",
  [BadgeExtra.Invalid]: "Non valido",
  [BadgeExtra.Loading]: "Caricamento",
};
