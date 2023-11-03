<script lang="ts">
	import Button from '$lib/component/button.svelte';
	import { page } from '$app/stores';
	import { auth, firestore, app } from '$lib/firebase.js';
	import { doc, getDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { marked } from 'marked';

	export let data;
	console.log(data.id);
	let dungeonData = null;
	let nowQuest = '';
	let questions = [];
	let monsterList = ['monster_1.png', 'monster_2.png', 'monster_3.png'];
	let searchingFlag = false;
	let markdownElm;

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				const userDungeonData = await getDoc(doc(firestore, 'dungeon', user.uid, 'list', data.id));
				dungeonData = { ...userDungeonData.data() };
				nowQuest = dungeonData.stages[dungeonData.progress];
				searchingFlag = true;
				const response = await (
					await fetch('https://tunatumuquest-renderapi.onrender.com/create-questions/', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							dungeon_name: dungeonData.name,
							stage_name: nowQuest
						})
					})
				).json();
				console.log(response);
				// markdownElm.innerHTML = marked.parse(response.questions);
				const questionRes = JSON.parse(response.questions);
				searchingFlag = false;
				//questions = [...response];
				console.log('->', questionRes);
			} else {
				goto('/');
			}
		});
	});
</script>

<div class="content-area">
	{#if dungeonData != null}
		<div class="animation-area">
			{#if searchingFlag}
				<img src="/yuusya1.png" width="128" height="128" />
			{:else}
				<img src={`/monster/1/${monsterList[0]}`} width="128" height="128" />
			{/if}
		</div>
		<div class="description-area">
			{#if searchingFlag}
				<p class="description">冒険中・・・</p>
			{:else}
				<p class="now-quest">{nowQuest}</p>
				<p class="description-small">問題</p>
				<p class="description-small">{questions[0]}</p>
			{/if}
		</div>
	{/if}
	<div bind:this={markdownElm} />
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
		background-image: url(/road_of_dungeon.png);
	}

	.animation-area {
		height: 30vh;
		background-image: url(/road_of_dungeon.png);
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-content: center;
		justify-content: center;
		align-items: center;
	}

	.description-area {
		height: 70vh;
		background-image: url(/background.png);
		align-items: center;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		display: flex;
		position: relative;
	}

	.stage-area {
		display: flex;
		flex-direction: row;
	}

	.description {
		font-size: 48px;
	}

	.description-small {
		font-size: 36px;
	}

	.button {
		text-align: center;
	}

	.button:active {
		transform: translateX(7px) translateY(7px);
	}

	.now-quest {
		position: absolute;
		top: 0;
		left: 0;
		margin: 5px;
	}
</style>
