const Campaign = () => {
  return (
    <div>
      <h1>Galang Dana</h1>
      <form>
        <label>Untuk siapa kamu menggalang dana</label>
        <select name='' id=''>
          <option value='saya-sendiri'>Saya Sendiri</option>
          <option value='orang-lain'>Orang Lain</option>
        </select>
        <input type='text' name='beneficiaryName' />
        <label>Beri judul untuk penggalangan danamu</label>
        <input type='text' name='title' />
        <label>Tentukan link untuk penggalangan danamu</label>
        <label>gunakan huruf tanpa spasi</label>
        <input type='text' name='endPoint' />
        <label>Nomor hp kamu yang dapat dihubungi</label>
        <input type='text' name='phoneNumber' />
        <label>Untuk apa dana tersebut digunakan?</label>
        <textarea name='purposeDescription' />
        <label>Berapa biaya yang kamu butuhkan</label>
        <input type='text' name='target' />
        <label>Pilih salah satu foto utama untuk penggalan danamu</label>
        <input type='file' name='image' />
        <label>Cerita</label>
        <textarea name='story' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Campaign
