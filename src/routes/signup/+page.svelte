<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/component/button.svelte';
	import { app, auth } from '$lib/firebase';
	import { createUserWithEmailAndPassword } from "firebase/auth"
	let email;
	let password;

	const signup = async () => {
		console.log(email, password)
		const signupRes = await createUserWithEmailAndPassword(auth, email, password);
		console.log(signupRes)		
		goto("/")
	};
</script>

<div class="content-area">
	<form class="form-area" on:submit={signup}>
		<label>email: </label>
		<input bind:value={email} />
		<label>password</label>
		<input bind:value={password} />
		<a class="button" on:click={signup}>
			<Button on:click={signup} text="新規登録"/>
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
        gap: 16px
	}

	.button:active {
        transform: translateX(7px) translateY(7px);
    }

</style>
