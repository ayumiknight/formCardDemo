import React from 'react';
import './App.less';
import Form, { FormData } from './components/Form';
import Confirm from './components/Confirm';

interface AppState {
    list: FormData[],
    confirmMessage: string
}

export default class App extends React.Component < {}, AppState > {

    state = {
        list: [{}],
        confirmMessage: '123'
    }

    slider = {
        mouseOnSlider: false,
        startX: 0,
        scrollLeft: 0
    }

    componentDidMount() {
        this.bindMouseDrag();
    }
    
    onFormChangeHandler(index: number, formData: FormData) {
        let {
            list
        } = this.state
        list[index] = formData;
        this.setState({
            list
        });
    }

    addOrRemove(action: string) {
        this.setState({
            list: this.state.list.concat({})
        });
    }

    onFormDelete(index: number) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list
        });
    }

    validateAndSubmit() {

        
        let list = this.state.list,
            formLength = list.length,
            errorMessage = '',
            currentIndex = 0;

        if (!formLength) return;

        while (currentIndex < list.length) {
            errorMessage = this.validate(list[currentIndex]);
            if (errorMessage) {
                break;
            }
            currentIndex ++;
        }

        if (errorMessage) {
            list.forEach((formData: FormData, index: number) => {
                formData.errorMessage = index === currentIndex ? errorMessage : ''
            })
            this.setState({
                list
            }, this.gotoForm.bind(this, currentIndex));
        } else {
            this.submit()
        }
    }


    validate(formData: FormData) {
        let {
            name,
            email,
            radioTest,
            checkTest
        } = formData;

        if (!name) return 'Please fill in name';
        if (!email) return 'Please fill in email';
        if (!email.match(/[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+/)) return 'Wrong email format';
        if (radioTest !== 1) return 'Please select correct';
        if (!checkTest) return 'Please check checkbox';
        return '';

    }

    gotoForm(currentIndex: number) {
        let currentFormRef = document.querySelector(`.form:nth-child(${currentIndex + 1})`) as HTMLElement,
            container = document.querySelector('#form-wrap') as HTMLElement;

        container.scrollLeft = currentFormRef.offsetLeft -100;
    }

    submit() {

        this.setState({
            list: [{}],
            confirmMessage: 'Updating List complete'
        })
    }

    bindMouseDrag() {
        let slider = document.getElementById('form-wrap') as HTMLElement;
        let {
            mouseOnSlider,
            startX,
            scrollLeft
        } = this.slider;
        if (slider) {
            slider.addEventListener('mousedown', (e) => {
                mouseOnSlider = true;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                mouseOnSlider = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mouseup', () => {
                mouseOnSlider = false;
                slider.classList.remove('active');
            });
            slider.addEventListener('mousemove', (e) => {
                if (!mouseOnSlider) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
            });
        }

    }

    render() {
        let {
            list,
            confirmMessage
        } = this.state;

        return <div className="App">
            
            <div className="form-wrap" id="form-wrap">
                {list && list.map((formData: FormData, index : number) => {
                    return <Form
                        ref={'form' + index}
                        key={index}
                        id={index}
                        formData={formData}
                        onChange={this.onFormChangeHandler.bind(this, index)}
                        onDelete={this.onFormDelete.bind(this, index)}
                    />
                  })}
            </div>
            <div className="buttons">
                <div onClick={this.addOrRemove.bind(this, 'add')}>Add Form</div>
                <div onClick={this.validateAndSubmit.bind(this)}>Submit</div>
            </div>
            {confirmMessage ? <Confirm 
                notice={confirmMessage}
                onClose={() => {
                    this.setState({
                        confirmMessage: ''
                    })
                }}
            /> : null}
        </div>
    }
}