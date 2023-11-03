<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/component/button.svelte';
	import { app, auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	let email;
	let password;

	const login = async () => {
		await signInWithEmailAndPassword(auth, email, password);
		goto('/start');
	};
</script>

<div class="content-area">
	<form class="form-area" on:submit={login}>
		<label>email: </label>
		<input bind:value={email} />
		<label>password</label>
		<input bind:value={password} />
		<a class="button" on:click={login}>
			<Button text="ログイン" />
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
