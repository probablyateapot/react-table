import React from 'react';

import Home from './components/Home';
import Modal from './components/Modal';
import ModalError from './components/ModalError';

import { repoUrl, buildDesc } from './config';

const BottomStickyBar = () => (
    <div className='navbar fixed-bottom'>
        <div className='ml-auto mr-2 mb-2 text-center'>
        { repoUrl &&
            <a href={repoUrl}>
                <span
                    style={{ fontSize: '3em' }}
                    className='fab fa-github text-secondary'
                />
            </a>
        }
        { buildDesc && <small className='d-block text-muted mt-1'>{ buildDesc }</small> }
        </div>
    </div>
);

class App extends React.PureComponent {
	constructor(props) {
		super(props);

        this.state = {
            ModalDialog: null,
            error: null,
            info: null
        };
        this.closeModal = this.closeModal.bind(this);
	}

	componentDidCatch(error, info) {
		this.setState({ error, info });
	}

    closeModal() {
        this.setState({ ModalDialog: null });
    }

	render() {
		const { ModalDialog, error, info } = this.state;

        if (error) {
            return (
                <>
                    <Modal>
                        <ModalError
                            title='Ошибка'
                            onClose={() => this.setState({ error: null, info: null })}
                        >
                            <h4>{ error.message }</h4>
                            <pre>{ info.componentStack }</pre>
                        </ModalError>
                    </Modal>
                    <BottomStickyBar />
                </>
            );
        }

        return (
            <>
                { ModalDialog && (
                    <Modal>
                        <ModalDialog onClose={this.closeModal} />
                    </Modal>
                ) }
                <Home
                    onShowModal={ModalDialog => this.setState({ ModalDialog })}
                    onCloseModal={this.closeModal}
                />
                <BottomStickyBar />
            </>
        );
	}
}

export default App;

