import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className=' text-center text-lg-left'>
      <div className='text-center p-3 text-white'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a  href='https://github.com/kaaado'>
          <span className="text-info">Kaaado</span>
        </a>
      </div>
    </MDBFooter>
  );
}
