import { TencentCamUser } from '../../types/generated'
import { RawTencentCamUser } from './data'

export default ({
  service,
}: {
  service: RawTencentCamUser
}): TencentCamUser=> {
  const {
    id,
    region,
    Uin: uin,
    Name: name,
    NickName: nickName,
    Remark: remark,
    ConsoleLogin: consoleLogin,
    PhoneNum: phoneNum,
    CountryCode: countryCode,
    Email: email,
    CreateTime: createTime,
  } = service

  return {
    id,
    region,
    uin: uin.toString(),
    name,
    nickName,
    remark,
    consoleLogin,
    phoneNum,
    countryCode,
    email,
    createTime,
  }
}
