<script lang="ts">
	import { onMount } from 'svelte';

	type TScrabledTextProps = {
		text: string;
		delay?: number;
	};

	const { text, delay = 0 }: TScrabledTextProps = $props();

	const charset = ['Y', 'C', '#', '_', '/', '!', '<', '>', '+', '$', 'X', '@'];
	const speed = 40;
	const revealDelay = 60;

	const randomChar = () => charset[Math.floor(Math.random() * charset.length)];

	const nextChar = (char: string) => {
		const index = charset.findIndex((c) => c === char);
		if (index === charset.length - 1) return charset[0];
		return charset[index + 1];
	};

	function createInitialChars() {
		return text.split('').map((char) => ({
			target: char,
			current: char === ' ' ? ' ' : randomChar(),
			isResolved: char === ' '
		}));
	}

	let chars = $state(createInitialChars());

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			for (const c of chars) {
				c.current = c.target;
				c.isResolved = true;
			}
			return;
		}

		let delayId: ReturnType<typeof setInterval> | undefined;
		let scrambleInterval: ReturnType<typeof setInterval> | undefined;
		let revealInterval: ReturnType<typeof setInterval> | undefined;

		const start = () => {
			scrambleInterval = setInterval(() => {
				let changed = false;
				for (let i = 0; i < chars.length; i++) {
					if (chars[i].isResolved) continue;
					chars[i].current = nextChar(chars[i].current);
					changed = true;
				}
				if (!changed) clearInterval(scrambleInterval);
			}, speed);

			revealInterval = setInterval(() => {
				const nextIndex = chars.findIndex((c) => !c.isResolved);
				if (nextIndex === -1) {
					clearInterval(revealInterval);
					clearInterval(scrambleInterval);
					return;
				}
				chars[nextIndex] = {
					...chars[nextIndex],
					current: chars[nextIndex].target,
					isResolved: true
				};
			}, revealDelay);
		};

		if (delay > 0) {
			delayId = setTimeout(() => {
				start();
			}, delay);
		} else {
			start();
		}

		return () => {
			delayId && clearTimeout(delayId);
			scrambleInterval && clearInterval(scrambleInterval);
			revealInterval && clearInterval(revealInterval);
		};
	});
</script>

<p class="scrambled-text" aria-label={text}>
	{#each chars as char}
		<span class:scrambled={!char.isResolved}>{char.current}</span>
	{/each}
</p>

<style>
	.scrambled-text {
		color: var(--title-h1-color);
		font-family: var(--logo-font);
		font-size: var(--h1-font-size);
		letter-spacing: 10px;
	}

	.scrambled {
		color: var(--pale-text-color);
	}
</style>
