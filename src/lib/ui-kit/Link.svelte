<script lang="ts">
	import type { TFont } from '#lib/types/ui-types.ts';
	import type { Snippet } from 'svelte';

	type TLinkProps = {
		useDecoration?: boolean;
		font?: TFont;
		href: string;
		children: Snippet;
	};

	const { useDecoration = true, font = 'main', href, children }: TLinkProps = $props();
</script>

<a {href} class="g-link link _font-{font} {useDecoration ? '_decoration' : null}">
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

		&._decoration {
			&::after {
				margin: auto;
				margin-top: 2px;
				content: '';
				display: block;
				width: 0;

				border-top: 2px solid var(--title-h3-color);

				transition: width 0.3s ease-in-out;
			}
		}

		&:hover {
			color: var(--title-h3-color);

			&::after {
				width: 100%;
			}
		}
	}
</style>
