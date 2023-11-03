<script>
	import Button from '$lib/component/button.svelte';
</script>

<div class="content-area">
	<p class="subtitle">game over...</p>
	<img src="/gameover.png" height="128" width="128" />

	<a href="/start">
		<Button text="復活する" />
	</a>
</div>

<style>
	.subtitle {
		font-size: 32px;
	}

	.content-area {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
		align-items: center;
		background-color: rgba(30, 30, 30, 0.5);
	}

	.dungeon-list {
		max-height: 50vh;
		background-color: white;
	}
</style>
