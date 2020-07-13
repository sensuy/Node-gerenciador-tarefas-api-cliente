import React from 'react';
import ReactDOM from 'react-dom';
import ItensListaTarefas from './itens-lista-tarefas';
import Tarefa from '../models/tarefa.model';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente que exibe um item da listagem de tarefas', () => {

	const tarefa = new Tarefa(1, 'Tarefa', false);
	const tarefaConcluida = new Tarefa(2, 'TarefaConcluida', true);

	it('Deve renderizar o componente sem erros', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ItensListaTarefas
			tarefas={[]}
			recarregarTarefas={() => false} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('Deve exibir a tarefa', () => {
		const { getByTestId } = render(
			<table>
				<tbody>
					<ItensListaTarefas
						tarefas={[tarefa]}
						recarregarTarefas={() => false}
					/>
				</tbody>
			</table>
		);
		expect(getByTestId('tarefa')).toHaveTextContent(tarefa.nome);

	});

	it('Deve exibir uma tarefa concluida', () => {
		const { getByTestId } = render(
			<table>
				<tbody>
					<ItensListaTarefas
						tarefas={[tarefaConcluida]}
						recarregarTarefas={() => false}
					/>
				</tbody>
			</table>
		);
		expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: line-through')

	})
})
