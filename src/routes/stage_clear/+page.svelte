<script lang="ts">
	import Button from '$lib/component/button.svelte';
	import { page } from '$app/stores';
	import { auth, firestore, app } from '$lib/firebase.js';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { marked } from 'marked';
	import { text } from '@sveltejs/kit';

	export let data;
	let dungeonData;
    let nowQuest;
	console.log(data.id);

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
                console.log(data.id)
				const userDungeonData = await getDoc(doc(firestore, 'dungeon', user.uid, 'list', data.id));
				dungeonData = { ...userDungeonData.data() };
				nowQuest = dungeonData.stages[dungeonData.progress-1];
			} else {
				goto('/');
			}
		});
	});
</script>

<div class="content-area">
	{#if dungeonData != null}
		<div class="animation-area">
			<img src="/yuusya1.png" class="chara-img" />
		</div>
		<div class="description-area">
			<p class="description">{nowQuest}</p>
			<p class="description">をクリアしました！</p>
            <a  href={`/dungeon?id=${data.id}`}>
                <Button text="次のダンジョンへ" />
            </a>
		</div>
	{/if}
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

	.chara-img {
		width: 96px;
		height: 96px;
		animation: move 1s steps(2, end) infinite alternate;
	}

	@keyframes move {
		0% {
			transform: translateY(16px);
		}
		100% {
			transform: translateY(-16px);
		}
	}
</style>
