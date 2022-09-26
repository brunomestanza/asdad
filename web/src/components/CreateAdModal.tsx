import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';
import { Check, GameController, ArrowDown } from 'phosphor-react';
import { DateButton } from './Form/DateButton';
import { Input } from './Form/Input';
import { FormEvent, useEffect, useState } from 'react';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [game, setGame] = useState('');

  useEffect(() => {
    axios('http://localhost:3333/games')
    .then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData)
    const data = Object.fromEntries(formData);
    if (!data.name) return;
    console.log(data);
    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
      "name": data.name,
      "yearsPlaying": Number(data.yearsPlaying),
      "discord": data.discord,
      "weekDays": weekDays.map(Number),
      "hourStart": data.hourStart,
      "hourEnd": data.hourEnd,
      "useVoiceChannel": useVoiceChannel,
    })

    alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err);
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="game" className='font-semibold'>Qual o game?</label>
              <Select.Root onValueChange={setGame} value={game}>
                <Select.Trigger className='flex flex-row justify-between bg-zinc-900 py-3 px-4 rounded text-sm'>
                  <Select.Value placeholder="Selecione o game que deseja jogar" />
                  <Select.Icon>
                    <ArrowDown size={20} />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content>
                    <Select.ScrollUpButton />
                      <Select.Viewport>
                        {games.map(game => {
                          return (
                            <Select.Item value={game.id} key={game.id} className="bg-zinc-900 py-3 px-4 rounded text-sm text-white">
                              <Select.ItemText className='text-red'>{game.title}</Select.ItemText>
                            </Select.Item>
                          )
                        })}
                      </Select.Viewport>
                      <Select.ScrollDownButton />
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input id='name' name='name' placeholder='Como te chamam dentro do game?' />
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual o seu discord?</label>
                <Input name='discord' id='discord' placeholder='Usuário#0000' />
              </div>
            </div>
            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root onValueChange={setWeekDays} type="multiple" className='grid grid-cols-4 gap-2'>
                    <DateButton weekDays={weekDays} indexValue='0' title='Domingo' day='D' />
                    <DateButton weekDays={weekDays} indexValue='1' title='Segunda' day='S' />
                    <DateButton weekDays={weekDays} indexValue='2' title='Terça' day='T' />
                    <DateButton weekDays={weekDays} indexValue='3' title='Quarta' day='Q' />
                    <DateButton weekDays={weekDays} indexValue='4' title='Quinta' day='Q' />
                    <DateButton weekDays={weekDays} indexValue='5' title='Sexta' day='S' />
                    <DateButton weekDays={weekDays} indexValue='6' title='Sábado' day='S' />
                  </ToggleGroup.Root>
              </div>
              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="hourStart">Qual o horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input name='hourStart' id="hourStart" type="time" placeholder="De" />
                  <Input name='hourEnd' id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>
            {/* Usamos label abaixo para que haja seleção do checkbox se clicarmos no texto */}
            <label className='mt-2 flex gap-2 text-sm items-center'>
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(checked) => {
                  if(checked === true) {
                    setUseVoiceChannel(true);
                  } else {
                    setUseVoiceChannel(false);
                  }
                }}
                value={weekDays}
                className='w-6 h-6 p-1 rounded bg-zinc-900'
              >
                <Checkbox.Indicator>
                  <Check className='w-4 h-4 text-emerald-400' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me comunicar ao chat de voz
            </label>
            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
              <button
                className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
                type="submit"
              >
                <GameController size={24} />Encontrar duo
              </button>
            </footer>
          </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};