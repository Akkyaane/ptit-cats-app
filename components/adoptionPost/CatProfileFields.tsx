export default function CatProfileFields() {
  return (
    <fieldset style={{ border: '1px solid #000', padding: '20px', margin: '20px 0', backgroundColor: '#fff' }}>
      <h2 style={{ color: '#000', marginBottom: '15px' }}>Information du/des chat(s)</h2>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="name" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Prénom</label>
        <input type="text" name="name" id="name" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="sex" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Sexe</label>
        <select name="sex" id="sex" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}>
          <option value="male">Mâle</option>
          <option value="female">Femelle</option>
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
          required
          style={{ border: '1px solid #000', backgroundColor: '#fff' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="isIdentified" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Identifié</label>
        <input type="checkbox" name="isIdentified" id="isIdentified" required style={{ border: '1px solid #000', backgroundColor: '#fff' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les chiens</label>
        <select name="isDogFriendly" id="isDogFriendly" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%', marginBottom: '5px' }}>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
          <option value="unknown">Inconnu</option>
        </select>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les chats</label>
        <select name="isCatFriendly" id="isCatFriendly" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%', marginBottom: '5px' }}>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
          <option value="unknown">Inconnu</option>
        </select>
        <label style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Ententes avec les enfants</label>
        <select name="isChildFriendly" id="isChildFriendly" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
          <option value="unknown">Inconnu</option>
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
          <option value="apartment">Appartement</option>
          <option value="house">Maison</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="keyPoints" style={{ color: '#000', display: 'block', marginBottom: '5px' }}>Points clés</label>
        <select name="keyPoints" id="keyPoints" required style={{ border: '1px solid #000', padding: '8px', backgroundColor: '#fff', color: '#000', width: '100%' }}>
          <option value="1">Enfants respectueux</option>
          <option value="2">Foyer sans enfant en bas âge</option>
          <option value="3">Foyer avec un chat</option>
          <option value="4">Extérieur sécurisé</option>
        </select>
      </div>
    </fieldset>
  );
}
