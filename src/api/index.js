import stadium from "./stadium";
import question from "./question";
import register from "./register";
import login from "./login";
import recharge from "./recharge";
import user from "./user";
import cdkey from './cdkey.js'
import order from "./order";

export default {
	...stadium,
	...question,
	...register,
	...login,
	...recharge,
	...user,
	...cdkey,
	...order
}