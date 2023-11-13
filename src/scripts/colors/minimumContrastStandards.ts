export const minimumContrastStandards = {
    AA_text: 4.5,
    normal_text: 4.5,
    AAA_text: 7,
    enhanced_text: 7,
} as const;

export type minimumContrastStandard = keyof typeof minimumContrastStandards;