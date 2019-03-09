import { observable, computed, autorun, action } from 'mobx'

class State {
  	@observable count = 0
  	@observable name = 'HuaDong'
  	@computed get msg() {
		return `${this.name} say count is ${this.count}`
	}
	@action add() {
		this.count += 1
	}
}

export const appState = new State()
autorun(() => { // 如果数据有更新则自执行
	console.log(appState.msg)
})

setInterval(() => {
	appState.add()
}, 1000)

export default appState