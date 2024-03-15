interface SubSystem {
  /**
   * 子系统名称
   */
  name: string;
  /**
   * 子系统路径
   */
  url: string;
}

type SubSystemMatch = SubSystem | null;

interface SubSystemSetting {
  name: string;
  match: string[];
  url: string;
}
