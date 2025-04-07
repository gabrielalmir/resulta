import { tryCatchAsync } from '..';

const fetchData = async () => {
    const result = await tryCatchAsync<string, Error>(async () => "Dados carregados!");
    if (result.ok) {
        console.log(result.value); // "Dados carregados!"
    } else {
        console.error(result.error);
    }
};

fetchData();
