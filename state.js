const Bean = (() => {
	let hooks = [];
	let idx = 0;
	const inject = (initialValue) => {
		let state = hooks[idx] || initialValue;
		const _idx = idx;
		const setState = newVal => {
			hooks[_idx] = newVal;
		};
		idx++;
		return [
			state,
			setState
		];
	};
	const render = Component => {
		idx = 0;
		const C = Component();
		C.render();
		return C;
	}
	const onMount = (cb, depArray) => {
		const oldDeps = hooks[idx];
		let hasChanged = true;
		if (oldDeps) {
			hasChanged = depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
		}
		if (hasChanged) cb();
		hooks[idx] = depArray;
		idx++;
	}
	return {
		inject,
		render,
		onMount
	}
})();

const getBeans = () => document.querySelectorAll('[bean]');

const appendChildren = (node, children) => {
	node.appendChild(...children);
}

const injectStateContainer = (bean, id) => {
	const children = bean.children;
	const stateContainer = document.createElement('div');
	stateContainer.className = `state-container-${id}`;
	appendChildren(stateContainer, children);
	bean.innerHTML = null;
	bean.appendChild(stateContainer);
}

(generateId = function* () {
	for(let i = 1;;++i) yield i;
})()

const init = () => {
	const beans = document.getElementsByClassName('bean');
	const idGenerator = generateId();
	for (const bean of getBeans()) {
		const id = idGenerator.next().value;
		injectStateContainer(bean, id);
	}
}

init();


























