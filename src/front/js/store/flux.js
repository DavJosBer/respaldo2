const getState = ({ getStore, getActions, setStore }) => {
	return {
		/*Almacena los datos de manera global para ser usados en components, pages, index o layout*/
		store: {
			token: "",
			services: [],
			favorites: []
		},
		/*Almacena las funciones que llenan el store*/
		actions: {
			/*Recibe por parametro el email, username, password y address definidos en el formulario de registro
				a continuación realiza la función de fetch convirtiendo los parametros en formato JSON
				a continuación llena la base de datos de signup
			*/
			signup_user: (email, username, password, address) => {
				fetch(`${process.env.BACKEND_URL}/api/signup`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: `${email}`,
						username: `${username}`,
						password: `${password}`,
						address: `${address}`
					})
				})
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},
			/*Recibe por parametro el username y password definidos en el formulario de login
				a continuación realiza la función de fetch convirtiendo los parametros en formato JSON
				a continuación llena la base de datos de signup
			*/
			login_user: (username, password) => {
				fetch(`${process.env.BACKEND_URL}/api/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: `${username}`,
						password: `${password}`
					})
				})
					.then(response => response.json())
					.then(result => {
						//setStore({ favlist: result.favorites });
						setStore({ token: result.token });
					})
					.catch(error => console.log("error", error));
			},
			/*Recibe por parametro el email y username definidos en el formulario de reset password
				a continuación realiza la función de fetch convirtiendo los parametros en formato JSON
				el fetch envía un email con la password definida por el usuario
			*/
			reset_password: (username, email) => {
				fetch(`${process.env.BACKEND_URL}/api/reset`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: `${username}`,
						email: `${email}`
					})
				})
					.then(response => response.json())
					.then(result => console.log(username))
					.catch(error => console.log("error", error));
			},
			/*Trae mediante la funcion fetch los datos de service almacenados en la base de datos
			*/
			get_services: async () => {
				let result = await fetch(`${process.env.BACKEND_URL}/api`)
					.then(res => res.json())
					.then(data => {
						setStore({ services: data });
					})
					.catch(error => console.log(error));
			},
			/*Recibe por parametro el evento de boton, name, precio e id definidos en el componente
				a continuación realiza la función de fetch convirtiendo los parametros en formato JSON
				a continuación llena la base de datos de shopCart
			*/
			addFavorite: (name, precio, id) => {
				fetch(`${process.env.BACKEND_URL}/api/shopCart`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getStore().token}`
					},
					body: JSON.stringify({
						name: `${name}`,
						service_id: `${id}`,
						precio: `${precio}`,
						cantidad: 1
					})
				})
					.then(response => response.json())
					.then(result => setStore({ favorites: result }))
					.catch(error => console.log("error", error));

				console.log(getStore().favorites);
			},
			/*Recibe por parametro el index e id definidos en el shop cart
				a continuación realiza la función de fetch convirtiendo los parametros en formato JSON
				a continuación elimina el item la base de datos de shop cart
			*/
			removeFav: id => {
				fetch(`${process.env.BACKEND_URL}/api/shopCart`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getStore().token}`
					},
					body: JSON.stringify({
						id: `${id}`
					})
				})
					.then(response => response.json())
					.then(result => setStore({ favorites: result }))
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;
