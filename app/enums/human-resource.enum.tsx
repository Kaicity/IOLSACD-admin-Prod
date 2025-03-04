export enum HumanResourceRole {
  PRESIDENT = 'PRESIDENT',
  VICE_PRESIDENT = 'VICE_PRESIDENT',
  CHAIRPERSON = 'CHAIRPERSON',
  VICE_CHAIRMAN = 'VICE_CHAIRMAN',
  MEMBER = 'MEMBER',
}

export const HUMAN_RESOURCE_ROLES_LABEL: Record<HumanResourceRole, string> = {
  [HumanResourceRole.PRESIDENT]: 'Viện Trưởng',
  [HumanResourceRole.VICE_PRESIDENT]: 'Phó Viện Trưởng',
  [HumanResourceRole.CHAIRPERSON]: 'Chủ Tịch Hội Đồng',
  [HumanResourceRole.VICE_CHAIRMAN]: 'Phó Chủ Tịch Hội Đồng',
  [HumanResourceRole.MEMBER]: 'Thành viên Hội Đồng',
};

export const HUMAN_RESOURCE_ROLE_STYLES: Record<HumanResourceRole, string> = {
  [HumanResourceRole.PRESIDENT]: 'bg-blue-100 text-blue-600',
  [HumanResourceRole.VICE_PRESIDENT]: 'bg-purple-100 text-purple-600',
  [HumanResourceRole.CHAIRPERSON]: 'bg-green-100 text-green-600',
  [HumanResourceRole.VICE_CHAIRMAN]: 'bg-teal-100 text-teal-600',
  [HumanResourceRole.MEMBER]: 'bg-gray-100 text-gray-600',
};
