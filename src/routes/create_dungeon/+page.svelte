<script>
	import Button from '$lib/component/button.svelte';
	import { app, firestore, auth } from '$lib/firebase';
	import { addDoc, collection, doc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let goal = '統計検定一級';
	let userData = {};

	const generate = async () => {
		console.log(goal);
		if (goal != null) {
			const response = await (await fetch('https://tunatumuquest-renderapi.onrender.com/create-stages/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: goal
				})
			})).json();
			console.log(response);
			await addDoc(collection(firestore, 'dungeon', userData.uid, 'list'), {
				...response,
				name: goal,
				progress: 0
			});
		}
	};

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				userData = { ...user };
			} else {
				goto('/');
			}
		});
	});
</script>

<div class="content-area">
	<form class="form-area" on:submit={generate}>
		<label>あたらしい目標を入力してさい: </label>
		<input bind:value={goal} />
		<a class="button">
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
