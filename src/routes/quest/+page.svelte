<script lang="ts">
	import Button from '$lib/component/button.svelte';
	import { page } from '$app/stores';
	import { auth, firestore, app } from '$lib/firebase.js';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
	let questionNum = 0;
	let monsterNum = 0;
	let monsterHP = 3;
	let playerHP = 3;
	let difficulity = 0;
	let userData;
	let monsterElement;

	const getNewQuestion = async () => {
		searchingFlag = true;
		const response = await (
			await fetch('https://tunatumuquest-renderapi.onrender.com/create-questions-para', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					dungeon_name: dungeonData.name,
					stage_name: nowQuest,
					difficulity: difficulity
				})
			})
		).json();
		console.log(response);
		questions = [...response.questions];
		searchingFlag = false;
		monsterNum = Math.floor(Math.random() * 3);
	};

	const answerQuestion = async (selectIndex) => {
		if (questions[questionNum].answer == selectIndex) {
			console.log('OK');
			monsterHP = monsterHP - 1;
			if (monsterHP == 0) {
				monsterElement.animate(
					{
						opacity: 0
					},
					{
						fill: 'forwards',
						duration: 1000
					}
				);
				difficulity++;
				questionNum = 0;
				if (difficulity == 3) {
					console.log(data.id);
					await updateDoc(doc(firestore, 'dungeon', userData.uid, 'list', data.id), {
						progress: dungeonData.progress + 1
					});
					goto(`/stage_clear?id=${data.id}`);
				} else {
					await getNewQuestion();
				}
				monsterHP = 3;
			} else {
				questionNum++;
			}
		} else {
			playerHP = playerHP - 1;
			if (playerHP == 0) {
				goto('/gameover');
			} else {
				questionNum++;
			}
		}

		console.log(monsterHP, questions[questionNum]);
	};

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				userData = user;
				const userDungeonData = await getDoc(doc(firestore, 'dungeon', user.uid, 'list', data.id));
				dungeonData = { ...userDungeonData.data() };
				nowQuest = dungeonData.stages[dungeonData.progress];
				await getNewQuestion();
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
				<img src="/yuusya1.png" class="chara-img" />
			{:else}
				<div class="life-area">
					<img src="/monster_life.png" />
					{#if monsterHP <= 1}
						<img src="/monster_damage_life.png" />
					{:else}
						<img src="/monster_life.png" />
					{/if}
					{#if monsterHP <= 2}
						<img src="/monster_damage_life.png" />
					{:else}
						<img src="/monster_life.png" />
					{/if}
				</div>
				<img
					src={`/monster/${difficulity + 1}/${monsterList[monsterNum]}`}
					class="chara-img"
					bind:this={monsterElement}
				/>
				<div class="life-area">
					<img src="/life.png" />
					{#if playerHP <= 1}
						<img src="/damage_life.png" />
					{:else}
						<img src="/life.png" />
					{/if}
					{#if playerHP <= 2}
						<img src="/damage_life.png" />
					{:else}
						<img src="/life.png" />
					{/if}
				</div>
			{/if}
		</div>
		<div class="description-area">
			{#if searchingFlag}
				<p class="description">冒険中・・・</p>
			{:else}
				<p class="now-quest">{nowQuest}</p>
				<div style="position: absolute;top: 16px;">
					<p class="description-small">問題</p>
					<p class="description-small">{questions[questionNum].question}</p>
					<div class="choise-area">
						{#each questions[questionNum].choices as choice, choiceIndex}
							<a class="button" on:click={() => answerQuestion(choiceIndex)}>
								<Button text={choiceIndex + ' : ' + choice} />
							</a>
						{/each}
					</div>
				</div>
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
		gap: 16px;
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
		overflow-y: auto;
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

	.chara-img {
		width: 64px;
		height: 64px;
		animation: move 1s steps(4, end) infinite alternate;
	}

	@keyframes move {
		0% {
			transform: translateY(16px);
		}
		100% {
			transform: translateY(-16px);
		}
	}

	.choise-area {
		display: flex;
		flex-direction: column;
		gap: 8px;
		align-items: center;
	}

	.life-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
	}

	.life-area > img {
		height: 32px;
		width: 32px;
	}
</style>
