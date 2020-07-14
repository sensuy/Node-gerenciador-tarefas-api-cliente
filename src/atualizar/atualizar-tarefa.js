import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { A, navigate } from 'hookrouter';
import axios from 'axios';
import Tarefa from '../models/tarefa.model';

function AtualizarTarefa(props) {

	const API_URL_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/';

	const [exibirModal, setExibirModal] = useState(false);
	const [formValidado, setFormValidado] = useState(false);
	const [tarefa, setTarefa] = useState('');
	const [carregarTarefa, setCarregarTarefa] = useState(true);
	const [exibirModalErro, setExibirModalErro] = useState(false);

	useEffect(() => {
		async function obterTarefa() {
			try {
				let { data } = await axios.get(API_URL_TAREFAS + props.id);
				setTarefa(data.nome);
			} catch (error) {
				navigate('/');
			}
		}
		if (carregarTarefa) {
			obterTarefa();
			setCarregarTarefa(false);
		}
	}, [carregarTarefa, props])

	function voltar(event) {
		event.preventDefault();
		navigate('/');
	}

	function handleFecharModal() {
		navigate('/');
	}

	async function atualizar(event) {
		event.preventDefault();
		setFormValidado(true);
		if (event.currentTarget.checkValidity() === true) {
			try {
				const tarefaAtualizar = new Tarefa(null, tarefa, false);
				await axios.put(API_URL_TAREFAS + props.id, tarefaAtualizar);
				setExibirModal(true);
			} catch (error) {
				setExibirModalErro(true);
			}
		}
	}

	function handleTxtTarefa(event) {
		setTarefa(event.target.value);
	}

	function handleFecharModaleErro() {
		exibirModalErro(false);
	}
	return (
		<div>
			<h3 className="text-center" >Atualizar</h3>
			<Jumbotron>
				<Form onSubmit={atualizar} noValidate validated={formValidado}>
					<Form.Group>
						<Form.Label>Tarefa</Form.Label>
						<Form.Control
							type="text"
							placeholder="Digite a tarefa"
							minLength="5"
							maxLength="100"
							required
							value={tarefa}
							onChange={handleTxtTarefa}
							data-testid="txt-tarefa" />
						<Form.Control.Feedback type="invalid">
							A tarefa deve conter ao menos 5 caracteres.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="text-center">
						<Button variant="success" type="submit" data-testid="btn-atualizar">
							Atualizar
						</Button>
						&nbsp;
						<A href="/"
							className="btn btn-light"
							onClick={voltar}>
							Voltar
						</A>
					</Form.Group>
				</Form>
				<Modal show={exibirModal}
					onHide={handleFecharModal}
					data-testid="modal">
					<Modal.Header closeButton>
						<Modal.Title>Sucesso</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Tarefa Atualizada com sucesso!
						</Modal.Body>
					<Modal.Footer>
						<Button variant="success" onClick={handleFecharModal}>
							Continuar
							</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={exibirModalErro} onHide={handleFecharModaleErro}>
					<Modal.Header>
						<Modal.Title></Modal.Title>
					</Modal.Header>
					<Modal.Body>
						Erro ao atualizar tarefa, tente novamente em instantes.
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="warning"
							onClick={handleFecharModaleErro}>
							Fechar
						</Button>
					</Modal.Footer>
				</Modal>
			</Jumbotron>
		</div>
	);
}

AtualizarTarefa.propTypes = {
	id: PropTypes.string.isRequired
};

export default AtualizarTarefa;