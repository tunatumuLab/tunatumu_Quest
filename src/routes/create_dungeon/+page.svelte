<script>
    import Button from "$lib/component/button.svelte";
    let goal = null;

    const generate = async () => {
        if(goal != null){
        }
    }
</script>

<div class="content-area">
	<form class="form-area" on:submit={generate}>
		<label>あたらしい目標を入力してさい: </label>
		<input bind:value={goal} />
		<a class="button" on:click={generate}>
			<Button text="作成!" />
		</a>
	</form>
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
	}

	.form-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 16px;
	}

	.button:active {
		transform: translateX(7px) translateY(7px);
	}
</style>
