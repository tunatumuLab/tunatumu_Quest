<script lang="ts">
	import Button from '$lib/component/button.svelte';
	import { page } from '$app/stores';
	import { auth, firestore, app } from '$lib/firebase.js';
	import { doc, getDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;
	console.log(data.id);
	let dungeonData = null;
	let mapName = ['森', '沼', '洞窟'];
	let mapImage = ['mori.png', 'numa.png', 'hole.png'];

	onMount(async () => {
		onAuthStateChanged(auth, async (user) => {
			console.log(user);
			if (user) {
				const userDungeonData = await getDoc(doc(firestore, 'dungeon', user.uid, 'list', data.id));
				dungeonData = { ...userDungeonData.data() };
                console.log(dungeonData)
			} else {
				goto('/');
			}
		});
	});
</script>

<div class="content-area">
	{#if dungeonData != null}
		<div class="animation-area">
			<div class="stage-area">
				{#each dungeonData.stages.slice(dungeonData.progress < 2 ? 0 : dungeonData.progress, 5) as stage, index}
					<div class="map-element">
						<p>{stage}</p>
						<img src={'/map/' + mapImage[dungeonData.progress + (index % 3)]} />
						{#if dungeonData.progress == index}
							<img src="/yuusya1.png" width="64" height="64" />
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="description-area">
			<p class="description-small">次は</p>
			<p class="description">
				{dungeonData.stages[dungeonData.progress] + 'の' + mapName[dungeonData.progress % 3]}
			</p>
			<p class="description-small">です</p>
			<a class="button" href={`/quest?id=${data.id}`}>
				<Button
					text={dungeonData.stages[dungeonData.progress] +
						'の' +
						mapName[dungeonData.progress % 3] +
						'に進む'}
				/>
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
	}

	.description-area {
		height: 70vh;
		background-image: url(/background.png);
		align-items: center;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		display: flex;
	}

	.stage-area {
		display: flex;
		flex-direction: row;
        justify-content: space-around;
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

	.map-element {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: nowrap;
        gap:1
        px;
	}
</style>
