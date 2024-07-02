import {Character, sequelize} from "./models/character.model.js";
import { getCharacters } from 'rickmortyapi'

const fetchAndSaveCharacters = async () => {
    let page = 1;
    let pages = 2;
    let count = 0;
    let saveCount = 0;

    async function saveCharacters() {

        while(page <= pages) {
            let response = await getCharacters({page})
            pages = response.data.info.pages
            count = response.data.info.count

            saveCount += response.data.results.length

            for(const char of response.data.results) {
                const character = await Character.create({
                    name: char.name,
                    data: char
                })
            }

            console.log(`Страница ${page} сохранена. Сохранил ${saveCount} персонажей из ${count}`)
            page += 1;

        }
        console.log('Сохранил всех персонажей.')
    }

    try {
        await saveCharacters()
    } catch (e) {
        console.log(e)
        if(saveCount < count) {
            await saveCharacters()
        }
    }

}

async function main() {
    try {
        await sequelize.authenticate()
        console.log('Успешное подключение к базе данных.');

        await Character.sync()
        console.log('Модель Character синхронизирована.');

        await fetchAndSaveCharacters()
    } catch (err) {
        console.error('Ошибка подключения к базе данных или синхронизации модели:', err);
    }
}
main();