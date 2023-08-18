import { json } from '@sveltejs/kit';
import * as database from '$lib/server/database.js';

export async function GET({cookies}) {
	// const number = Math.floor(Math.random() * 6) + 1;
    // return json({numero : number});
	const userid = cookies.get('userid');
	const lista = await database.getAll( userid );
	return json(lista, { status: 200});
}


export async function POST({ request, cookies }) {
	const { description } = await request.json();

	const userid = cookies.get('userid');
	const { id } = await database.createTodo({ userid, description });

	return json({ id, description }, { status: 201 });
}