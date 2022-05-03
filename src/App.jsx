import { useEffect, useState } from "react";

// The OAuth client ID from the integration page!
const oauth_client_id = "8d8bc085-e453-4630-8a3e-03e662398521";

function App() {
	const [dbs, setdbs] = useState([]);

	// When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
	useEffect(() => {
		const params = new URL(window.document.location).searchParams;
		const code = params.get("code");
		if (!code) return;
		fetch(`http://127.0.0.1:8000/login/${code}`).then(async (resp) => {
			setdbs(await resp.json());
		});
	}, []);
	console.log(dbs);
	return (
		<div>
			<a
				style={{ display: "block" }}
				href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=8d8bc085-e453-4630-8a3e-03e662398521&redirect_uri=http://localhost:3000/&response_type=code`}
			>
				Connect to Notion
			</a>
			{/* {dbs.map((db) => (
				<div
					style={{
						display: "inline-flex",
						whiteSpace: "pre",
						border: "1px solid black",
						marginBottom: 10,
					}}
				>
					{JSON.stringify(db, null, 2)}
				</div>
			))} */}
		</div>
	);
}

export default App;
