import { combine, err, mapErr, ok, tryCatchAsync } from 'resulta';

const fetchData = async () => {
    const result = await tryCatchAsync<string, Error>(async () => "Dados carregados!");
    if (result.ok) {
        console.log(result.value); // "Dados carregados!"
    } else {
        console.error(result.error);
    }
};

fetchData();

// Exemplo avançado: combinando múltiplos resultados e mapeando erros
const results = [ok(1), ok(2), err('Falha no terceiro'), ok(4)];
const combinado = combine(results);

if (combinado.ok) {
    console.log('Todos os valores:', combinado.value);
} else {
    // Mapeando o erro para adicionar contexto
    const erroMapeado = mapErr<string[], string>(combinado, (e: string) => `Erro ao combinar: ${e}`);
    console.error(erroMapeado.error);
}
