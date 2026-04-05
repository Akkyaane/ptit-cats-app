export default function CatProfileFields() {
  return (
    <fieldset style={{ border: '1px solid #000', padding: '20px', margin: '20px 0', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#000', marginBottom: '15px' }}>Information du/des chat(s)</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Prénom</label>
        <input type="text" name="name" id="name" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="birthDate" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Date de naissance</label>
        <input type="date" name="birthDate" id="birthDate" style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="sex" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Sexe</label>
        <select name="sex" id="sex" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}>
          <option value="Male">Mâle</option>
          <option value="Female">Femelle</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="isDewormed" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Déparasité</label>
        <input type="checkbox" name="isDewormed" id="isDewormed" required style={{ border: '1px solid #000', backgroundColor: '#fff' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="isVaccinated" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Vacciné</label>
        <input type="checkbox" name="isVaccinated" id="isVaccinated" required style={{ border: '1px solid #000', backgroundColor: '#fff' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="isSterilizedOrCastrated" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Stérilisé ou castré</label>
        <input
          type="checkbox"
          name="isSterilizedOrCastrated"
          id="isSterilizedOrCastrated"
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="isIdentified" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Identifié</label>
        <input type="checkbox" name="isIdentified" id="isIdentified" required style={{ border: '1px solid #000', backgroundColor: '#fff' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les chiens</label>
        <select name="dogAffinity" id="dogAffinity" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%', marginBottom: '5px' }}>
          <option value="Yes">Oui</option>
          <option value="No">Non</option>
          <option value="Unknown">Inconnu</option>
        </select>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les chats</label>
        <select name="catAffinity" id="catAffinity" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%', marginBottom: '5px' }}>
          <option value="Yes">Oui</option>
          <option value="No">Non</option>
          <option value="Unknown">Inconnu</option>
        </select>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les enfants</label>
        <select name="childAffinity" id="childAffinity" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}>
          <option value="Yes">Oui</option>
          <option value="No">Non</option>
          <option value="Unknown">Inconnu</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="livingEnvironmentType" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Type de lieu de vie</label>
        <select
          name="livingEnvironmentType"
          id="livingEnvironmentType"
          required
          style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}
        >
          <option value="Apartment">Appartement</option>
          <option value="House">Maison</option>
          <option value="Other">Autre</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="keyPoints" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Points clés</label>
        <select name="keyPoints" id="keyPoints" multiple required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%', height: '100px' }}>
          <option value="Enfants respectueux">Enfants respectueux</option>
          <option value="Foyer sans enfant en bas âge">Foyer sans enfant en bas âge</option>
          <option value="Foyer avec un chat">Foyer avec un chat</option>
          <option value="Extérieur sécurisé">Extérieur sécurisé</option>
        </select>
      </div>
    </fieldset>
  );
}
