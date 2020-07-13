import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListarTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao';
import Ordenacao from './ordenacao';
import axios from 'axios';

function ListarTarefas() {

	const ITEMS_POR_PAG = 3;
	const API_URL_LISTAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas'

	const [tarefas, setTarefas] = useState([]);
	const [carregarTarefas, setCarregarTarefas] = useState(true);
	const [totalItems, setTotalItems] = useState(0);
	const [paginaAtual, setPaginaAtual] = useState(1);
	const [ordenarAsc, setOrdernarAsc] = useState(false);
	const [ordernarDesc, setOrdernarDesc] = useState(false);
	const [filtroTarefa, setFiltroTarefa] = useState('');


	useEffect(() => {
		async function obterTarefas() {
			// ordenar
			let ordem = '';
			if (ordenarAsc) {
				ordem = 'ASC';
			} else if (ordernarDesc) {
				ordem = 'DESC';
			}

			try {
				const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`
				let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
				setTotalItems(data.totalItens);
				setTarefas(data.tarefas);
			} catch (error) {
				setTarefas([]);
			}
		}
		if (carregarTarefas) {
			obterTarefas();
			setCarregarTarefas(false);
		};
	}, [carregarTarefas, paginaAtual, ordenarAsc, ordernarDesc, filtroTarefa]);

	function handleMudarPagina(pagina) {
		setPaginaAtual(pagina);
		setCarregarTarefas(true);
	}

	function handleOrdenar(event) {
		event.preventDefault();
		if (!ordenarAsc && !ordernarDesc) {
			setOrdernarAsc(true);
			setOrdernarDesc(false);
		} else if (ordenarAsc) {
			setOrdernarAsc(false);
			setOrdernarDesc(true)
		} else {
			setOrdernarAsc(false);
			setOrdernarDesc(false);
		}
		setCarregarTarefas(true);
	};

	function handleFiltrar(event) {
		setFiltroTarefa(event.target.value);
		setCarregarTarefas(true);
	};

	return (
		<div className="text-center">
			<h3>Tarefas a fazer</h3>
			<Table striped bordered hover responsive data-testid="tabela">
				<thead>
					<tr>
						<th>
							<a href="/" onClick={handleOrdenar} >
								Tarefa
								&nbsp;
								<Ordenacao
									ordenarAsc={ordenarAsc}
									ordenarDesc={ordernarDesc}
								/>
							</a>
						</th>
						<th>
							<A href="/cadastrar"
								className="btn btn-success btn-sm"
								data-testid="btn-nova-tarefa">
								<FontAwesomeIcon icon={faPlus} />
								&nbsp;
								Nova tarefa
							</A>
						</th>
					</tr>
					<tr>
						<th>
							<Form.Control
								type="text"
								value={filtroTarefa}
								onChange={handleFiltrar}
								className="filtro-tarefa"
								data-testid="txt-tarefa" />
						</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<ItensListarTarefas
						tarefas={tarefas}
						recarregarTarefas={setCarregarTarefas}
					/>
				</tbody>
			</Table>
			<Paginacao
				totalItems={totalItems}
				itemsPorPagina={ITEMS_POR_PAG}
				paginaAtual={paginaAtual}
				mudarPagina={handleMudarPagina}
			/>
		</div>
	);
};

export default ListarTarefas;