import { Formik } from 'formik';
import TextInput from './TextInput'
import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    content: Yup.string().required('provide a task subject').min(3),
})

const AddForm = ({ addItem }) => (
    <Formik
        initialValues={{
            content: '',
        }}
        validationSchema={formSchema}
        onSubmit={(data => addItem(data))}
    >
        {({
            handleSubmit,
        }) => {
            return (
                <div className={'form'}>
                    <div className={'form-inside'}>
                        <form onSubmit={handleSubmit}>
                            <TextInput
                                name={'content'}
                                placeholder={'provide a task subject'}
                                label={'Add task:'}
                            />
                            <button type={'submit'}>Submit</button>
                        </form>
                    </div>
                </div>
            )
        }}
    </Formik>
)

export default AddForm