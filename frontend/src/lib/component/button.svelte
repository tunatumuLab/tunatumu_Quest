<script>
    export let text = ""
</script>


<button>
    <img src="/button_base.png" />
    <p>{text}</p>
</button>

<style>
    button {
		position: relative;
		display: inline-block;
		background: none;
		border: none;
		outline: none;
	}

	button > img {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
        top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
        width: 100%;
	}

	button > p {
		position: relative;
		z-index: 1;
        text-align: center;
        color: white;
        margin: 16px;
	}
</style>