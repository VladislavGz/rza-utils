<script lang="ts">
	import type { TFont } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TLinkProps = {
		font?: TFont;
		href: string;
		children: Snippet;
	};

	const { font = 'main', href, children }: TLinkProps = $props();
</script>

<a {href} class="g-link link _font-{font}">
	{@render children()}
</a>

<style>
	.link {
        &._font-main {
            font-family: var(--main-font);
        }

        &._font-accent {
            font-family: var(--accent-font);
        }

        &._font-logo {
            font-family: var(--logo-font);
        }
	}
</style>
