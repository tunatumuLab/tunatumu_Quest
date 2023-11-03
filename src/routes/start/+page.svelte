<script>
	import { onMount } from "svelte";
    import {app, firestore, auth} from "$lib/firebase"
    import {getDocs, collection} from "firebase/firestore"
    import {onAuthStateChanged} from "firebase/auth"
	import { goto } from "$app/navigation";
    import Button from "$lib/component/button.svelte";

    let dungeons = [];

    onMount(async () => {
        console.log("aaaaa")
        onAuthStateChanged(auth, async (user) => {
            console.log(user)
            if(user) {
                const userDungeonData = await getDocs(collection(firestore, "dungeon", user.uid, "list"))
                dungeons = userDungeonData.docs.map(elm => {return {id:elm.id, ...elm.data()}})
                console.log(dungeons)
            }
            else{
                goto("/")
            }
        })
    })
</script>

<div class="content-area">
	<p class="subtitle">続きから</p>
    <div class="dungeon-list">
        {#each dungeons as dungeon}
            <a>
                <p>{dungeon.name}</p>
            </a>
        {/each}
    </div>

	<a href="/create_dungeon">
        <Button text="新しいダンジョンを作る"></Button>
    </a>
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
	}

    .dungeon-list {
        max-height: 50vh;
        background-color: white;
    }
</style>
