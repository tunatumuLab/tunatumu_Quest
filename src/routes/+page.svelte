<script>
	import Button from '$lib/component/button.svelte';
</script>

<div class="content-area">
    <img src="/title.png" class="title-logo" />
    <a class="button" href="/login">
        <Button text={'ログイン'} />
    </a>
    <a class="button" href="signup">
        <Button text={'新規登録'} />
    </a>
    <!-- <a class="button" href="/start">
        <Button text={'スタート'} />
    </a> -->
</div>

<style>
    .content-area {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;

    }

    .button {
        text-align: center;
    }

    .button:active {
        transform: translateX(7px) translateY(7px);
    }

	.title-logo {
		width: 100%;
	}
</style>
