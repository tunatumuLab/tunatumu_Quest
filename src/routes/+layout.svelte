<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Button from '$lib/component/button.svelte';

	let windowHeight = 0;
	let windowWidth = 0;
	let gameArea;
	let musicDialog;
    let isPlayMusic = false;

    const startMusic = () => {
        let music = new Audio('/opening.mp3');
		music.muted = true;
		music.pause();
		if ($page.route.id.includes('dungeon')) {
			music = new Audio('/field.mp3');
		} else if ($page.route.id.includes('quest')) {
			music = new Audio('/battle_nes.mp3');
		}
		music.loop = true;
		music.play();
        // music.pause();
        musicDialog.close()
    }

	onMount(() => {
		// musicDialog.show();
		console.log($page);
        if(isPlayMusic){
            let music = new Audio('/opening.mp3');
            music.muted = true;
            // music.pause();
            if ($page.route.id.includes('dungeon')) {
                music = new Audio('/field.mp3');
            } else if ($page.route.id.includes('quest')) {
                music = new Audio('/battle_nes.mp3');
            }
            music.loop = true;
            music.play();
        }

		// const music = new Audio('/opening.mp3');
		// music.play()
		// const music = new Audio('/opening.mp3');
		// music.play()
		windowHeight = window.parent.screen.height;
		windowWidth = window.parent.screen.width;
		console.log(windowHeight, windowWidth);

		if (windowHeight > windowWidth) {
			if (windowWidth * 1.61 < windowHeight) {
				console.log(1);
				gameArea.style.height = windowWidth * 1.61 + 'px';
				gameArea.style.width = windowWidth + 'px';
			} else {
				console.log(2);
				gameArea.style.height = windowHeight + 'px';
				gameArea.style.width = windowHeight / 1.61 + 'px';
			}
		} else {
			if (windowHeight < windowWidth * 1.61) {
				console.log(3);
				gameArea.style.height = windowHeight + 'px';
				gameArea.style.width = windowHeight / 1.61 + 'px';
			} else {
				console.log(4);
				gameArea.style.height = windowHeight + 'px';
				gameArea.style.width = windowHeight / 1.61 + 'px';
			}
		}
		console.log(gameArea.style, gameArea.style.height, gameArea.style.width);
	});
</script>

<div class="main-container">
	<div class="game-area" bind:this={gameArea}>
		<slot />
	</div>

	<dialog bind:this={musicDialog}>
		<p>このサイトでは音楽を再生します</p>
		<p>再生しますか？</p>
		<div>
			<button on:click={startMusic}>
				<Button text="はい" />
			</button>
			<button on:click={(() => {musicDialog.closeModal()})}>
				<Button text="いいえ" />
			</button>
		</div>
	</dialog>
</div>

<style>
	.main-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.game-area {
		aspect-ratio: 9/16;
		background-color: white;
		background-image: url(/first_background.png);
	}
</style>
