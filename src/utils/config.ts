import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import { clg } from './console'
let configRootPath = process.cwd()

/**
 * @description 获取配置文件路径
 * @author Wynne
 * @date 2021-07-02
 */
function configPath() {
  return path.resolve(configRootPath, './ygt.config.js')
}

/**
 * @description 设置配置文件根路径，主要为了适配vscode插件
 * @author Wynne
 * @date 2021-07-02
 * @export
 * @param root
 */
export function setConfigRootPath(root: string): void {
  configRootPath = root
}

/**
 * @description 获取配置
 * @author Wynne
 * @date 2021-07-02
 * @export
 * @return {*}
 */
export function getConfig(): IConfig { return require(configPath()) }

/**
 * @description 是否存在配置
 * @author Wynne
 * @date 2021-06-25
 */
export const existConfig = (): boolean => {
  return fs.existsSync(configPath())
}

/**
 * @description 初始化默认配置
 * @author Wynne
 * @date 2021-06-25
 */
export const initConfig = async (): Promise<void> => {
  if (existConfig()) {
    const res = await inquirer.prompt({
      type: 'confirm',
      message: '已存在本地配置，是否覆盖？',
      name: 'isOverlap',
      default: false
    })
    if (!res.isOverlap) {
      clg('red', '已取消生成配置')
      return
    }
  }
  generateDefaultConfig()
  clg('green', '默认配置已生成，请根据文档进行配置')
}

/**
 * @description 生成默认配置
 * @author Wynne
 * @date 2021-06-25
 */
export const generateDefaultConfig = (): void => {
  const originPath = path.resolve(__dirname, '../templates/configTemplate/ygt.config.js')
  fs.copyFileSync(originPath, configPath())
}
