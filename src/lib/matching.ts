export const GENDER_OPTIONS = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "nonbinary", label: "Non-binary" },
  { value: "another_identity", label: "Another identity" },
] as const;

export type GenderValue = (typeof GENDER_OPTIONS)[number]["value"];

const GENDER_VALUES = new Set<string>(GENDER_OPTIONS.map((option) => option.value));

export function normalizeGender(value: unknown): GenderValue | null {
  const gender = String(value ?? "").trim();
  return GENDER_VALUES.has(gender) ? (gender as GenderValue) : null;
}

export function normalizeInterestedGenders(value: unknown): GenderValue[] {
  let input: unknown = value;

  if (typeof value === "string") {
    try {
      input = JSON.parse(value);
    } catch {
      input = [];
    }
  }

  if (!Array.isArray(input)) return [];

  return Array.from(
    new Set(
      input
        .map((item) => normalizeGender(item))
        .filter((item): item is GenderValue => item !== null)
    )
  );
}

export function genderLabel(value: string | null | undefined) {
  return GENDER_OPTIONS.find((option) => option.value === value)?.label ?? "Not set";
}
