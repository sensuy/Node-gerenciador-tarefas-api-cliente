import React from 'react';
import ReactDOM from 'react-dom';
import RemoverTarefa from './remover-tarefa';
import Tarefa from '../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe.skip('Teste do componente de remoção de tarefas', () => {

	const tarefa = new Tarefa(1, 'Tarefa de teste', false);

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(
			<RemoverTarefa
				tarefa={tarefa}
				recarregarTarefas={() => false} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Deve exibir a model', () => {
		const { getByTestId } = render(
			<RemoverTarefa
				tarefa={tarefa}
				recarregarTarefas={() => false} />
		);
		fireEvent.click(getByTestId('btn-abrir-modal'));
		expect(getByTestId('modal')).toHaveTextContent(tarefa.nome);
	});

	it('Deve remover uma tarefa', () => {
		localStorage['tarefas'] = JSON.stringify([tarefa]);
		const { getByTestId } = render(
			<RemoverTarefa
				tarefa={tarefa}
				recarregarTarefas={() => false} />
		);
		fireEvent.click(getByTestId('btn-abrir-modal'));
		fireEvent.click(getByTestId('btn-remover'));
		const tarefasDb = JSON.parse(localStorage['tarefas']);
		expect(tarefasDb.length).toBe(0);

	})
})