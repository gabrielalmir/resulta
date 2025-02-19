import { type Result, err, ok } from 'resulta';

function hello(message = ''): Result<String, Error> {
    if (!message) {
        return err(new Error('hello without world'));
    }

    return ok(`hello ${message}`);
}

const result = hello();

if (result.ok) {
    console.log(result.value);
    process.exit(0);
}

console.error(result.error);
