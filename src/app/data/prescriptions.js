const all = {
  severe_burnout: [
    {
      id: "challenge",
      name: "도전형",
      emoji: "⚡",
      subtitle: "새로운 활동",
      type: "제주 어드벤처",
      duration: "5박6일",
      location: "제주 성산/우도",
      cost: "120-150만원",
    },
    {
      id: "maintain",
      name: "유지형",
      emoji: "🌊",
      subtitle: "균형 회복",
      type: "서귀포 힐링",
      duration: "7박8일",
      location: "제주 중문",
      cost: "150-200만원",
    },
    {
      id: "harmony",
      name: "화해형",
      emoji: "🕊️",
      subtitle: "고요 치유",
      type: "애월 명상",
      duration: "7박8일",
      location: "제주 애월",
      cost: "180-220만원",
    },
  ],
  // ... (energy_depletion, relationship_deficit, meaning_loss, overstimulation, anxiety_tension, mild_stress, healthy_maintenance)
  healthy_maintenance: [
    {
      id: "challenge",
      name: "도전형",
      emoji: "🏃",
      subtitle: "배우고 성장",
      duration: "월별",
      location: "서울/근교",
      cost: "월 10-20만원",
    },
    {
      id: "maintain",
      name: "유지형",
      emoji: "🌳",
      subtitle: "자연 접촉",
      duration: "월 1회",
      location: "사계절 명소",
      cost: "월 5-15만원",
    },
    {
      id: "harmony",
      name: "화해형",
      emoji: "📚",
      subtitle: "내면 성장",
      duration: "매주",
      location: "집/동네",
      cost: "월 5-10만원",
    },
  ],
};

export default function prescriptionsByType(diagnosisType) {
  return all[diagnosisType] || all.healthy_maintenance;
}
