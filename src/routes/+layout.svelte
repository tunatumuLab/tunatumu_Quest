<script>
	import { onMount } from 'svelte';
    let windowHeight = 0;
    let windowWidth = 0;
    let gameArea;

    onMount(() => {
        windowHeight = window.parent.screen.height;
        windowWidth = window.parent.screen.width;
        console.log(windowHeight, windowWidth)
        
        if(windowHeight > windowWidth){
            if(windowWidth* 1.61 < windowHeight){
                console.log(1)
                gameArea.style.height = windowWidth* 1.61 + "px";
                gameArea.style.width = windowWidth + "px"
            }
            else{
                console.log(2)
                gameArea.style.height = windowHeight + "px";
                gameArea.style.width = windowHeight/1.61 + "px"
            }
        }
        else {
            if(windowHeight < windowWidth * 1.61){
                console.log(3)
                gameArea.style.height = windowHeight + "px"
                gameArea.style.width = windowHeight / 1.61 + "px";
            }
            else {
                console.log(4)
                gameArea.style.height = windowHeight + "px"
                gameArea.style.width = windowHeight/1.61 + "px";
            }
        }
        console.log(gameArea.style, gameArea.style.height ,gameArea.style.width)
    })
</script>

<div class="main-container">
	<div class="game-area" bind:this={gameArea}>
        <slot></slot>
	</div>
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
