import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './concluir-tarefa';
import Tarefa from '../models/tarefa.model'
import { render, fireEvent, waitForElement, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe.skip('Teste do componente de conclusão de tarefas', () => {

	const tarefa = new Tarefa(1, 'Tarefa', false)

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ConcluirTarefa
			tarefa={tarefa}
			recarregarTarefas={() => false} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Deve exibir a modal', () => {
		const { getByTestId } = render(
			<ConcluirTarefa
				tarefa={tarefa}
				recarregarTarefas={() => false}
			/>
		);
		fireEvent.click(getByTestId('btn-abrir-modal'));
		expect(getByTestId('modal')).toHaveTextContent(tarefa.nome);
	});


	it('Deve concluir uma tarefa', async () => {

		localStorage['tarefas'] = JSON.stringify([tarefa]);
		const { getByTestId } = render(
			<ConcluirTarefa
				tarefa={tarefa}
				recarregarTarefas={() => true} />
		);

		fireEvent.click(getByTestId('btn-abrir-modal'));
		fireEvent.click(getByTestId('btn-concluir'));
		const tarefasDb = JSON.parse(localStorage['tarefas']);
		expect(tarefasDb[0].concluida).toBeTruthy()
	});



});