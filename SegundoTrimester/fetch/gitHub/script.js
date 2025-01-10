document.querySelector('#boton').addEventListener('click', async () => {
    const input = document.querySelector('#nombre');
    const nombre = input.value.trim();
    const url = `https://api.github.com/users/${nombre}`;
    const resultDiv = document.querySelector('#result');
    
    if (!nombre) {
        resultDiv.innerHTML = '<p>Introduce un nombre</p>';
        return;
    }

    // await fetch (url) -> asi es merjor hacer las promesas menos lioso
    try {
        // Fetch datos del usuario principal
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (!data) {
            throw new Error('Datos no encontrados.');
        }

        const { created_at, followers, following, followers_url, following_url } = data;
        let resulHTML = `
            <p>Fecha de creación de la cuenta: ${new Date(created_at).toLocaleDateString()}</p>
            <p>Número de seguidores: ${followers}</p>
            <p>Número de usuarios seguidos: ${following}</p>
        `;

        // Fetch seguidores
        try {
            const followersResponse = await fetch(followers_url);
            if (!followersResponse.ok) {
                throw new Error('Error al obtener los seguidores.');
            }

            const followersData = await followersResponse.json();
            if (followersData.length > 0) {
                resulHTML += `<ul>Seguidores:`;
                for (const follower of followersData) {
                    try {
                        const followerDetails = await fetch(follower.url);
                        if (!followerDetails.ok) {
                            throw new Error('Error al obtener detalles del seguidor.');
                        }
                        const followerInfo = await followerDetails.json();
                        resulHTML += `
                            <li>${followerInfo.login} - Fecha de creación: ${new Date(followerInfo.created_at).toLocaleDateString()}</li>
                        `;
                    } catch (error) {
                        resulHTML += `<li>${follower.login} - Error al obtener detalles</li>`;
                    }
                }
                resulHTML += `</ul>`;
            } else {
                resulHTML += `<p>No hay seguidores disponibles.</p>`;
            }
        } catch (error) {
            resulHTML += `<p>Error al obtener la lista de seguidores: ${error.message}</p>`;
        }

        // Fetch usuarios seguidos
        try {
            const followingResponse = await fetch(following_url.replace('{/other_user}', ''));
            if (!followingResponse.ok) {
                throw new Error('Error al obtener los usuarios seguidos.');
            }

            const followingData = await followingResponse.json();
            if (followingData.length > 0) {
                resulHTML += `<ul>Siguiendo:`;
                for (const following of followingData) {
                    try {
                        const followingDetails = await fetch(following.url);
                        if (!followingDetails.ok) {
                            throw new Error('Error al obtener detalles del usuario seguido.');
                        }
                        const followingInfo = await followingDetails.json();
                        resulHTML += `
                            <li>${followingInfo.login} - Fecha de creación: ${new Date(followingInfo.created_at).toLocaleDateString()}</li>
                        `;
                    } catch (error) {
                        resulHTML += `<li>${following.login} - Error al obtener detalles</li>`;
                    }
                }
                resulHTML += `</ul>`;
            } else {
                resulHTML += `<p>No hay usuarios seguidos disponibles.</p>`;
            }
        } catch (error) {
            resulHTML += `<p>Error al obtener la lista de usuarios seguidos: ${error.message}</p>`;
        }

        resultDiv.innerHTML = resulHTML;

    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        resultDiv.innerHTML = `<p>Error al introducir el nombre del usuario: ${error.message}</p>`;
    }
});
