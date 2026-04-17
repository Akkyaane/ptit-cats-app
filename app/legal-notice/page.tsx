import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalNotice() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              Mentions légales
            </h1>
            <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
              Informations légales et conditions d'utilisation du site.
            </p>
          </section>
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-12 text-[var(--color-quaternary)]">
        <section className="bg-[var(--color-tertiary)] p-8 rounded-lg shadow-md">
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Merci de lire avec attention les différentes modalités d’utilisation
            du présent site avant d’y parcourir ses pages. En vous connectant sur
            ce site, vous acceptez, sans réserves, les présentes modalités. Aussi,
            conformément à l’article n°6 de la Loi n°2004-575 du 21 Juin 2004 pour
            la confiance dans l’économie numérique, les responsables du présent
            site internet www.sanscroquettesfixes.fr sont :
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Éditeur du Site : Association Sans Croquettes Fixes (association loi 1901 à but non
            lucratif) Numéro de SIRET : 81819530700017 Responsable éditorial :
            Anaïs Hillion, en sa qualité de responsable de communication 22 chemin
            de Boutary 69300 Caluire et Cuire (il s’agit là d’une boîte postale,
            et non d’un refuge, merci de ne pas vous rendre sur place dans l’idée
            de voir les animaux, ils ne s’y trouvent pas) Téléphone : 06 18 25 72
            38 Email : <a href="mailto:contact@sanscroquettesfixes.fr" className="text-[var(--color-primary)] hover:underline">contact@sanscroquettesfixes.fr</a> Site Web :
            <a href="https://www.sanscroquettesfixes.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">www.sanscroquettesfixes.fr</a>
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Hébergement : Hébergeur : IONOS 1and1 Développement : Association Sans Croquettes Fixes (association loi
            1901 à but non lucratif) Caluire et Cuire (69) Site Web :
            <a href="https://www.sanscroquettesfixes.fr" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">www.sanscroquettesfixes.fr</a>
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Conditions d’utilisation : Ce site (www.sanscroquettesfixes.fr) est proposé en différents langages web
            (HTML, HTML5, Javascript, CSS, etc…) pour un meilleur confort
            d’utilisation et un graphisme plus agréable. Nous vous recommandons de
            recourir à des navigateurs modernes comme Internet Explorer, Safari,
            Firefox, Google Chrome, etc… L’association Sans Croquettes Fixes met
            en œuvre tous les moyens dont elle dispose, pour assurer une
            information fiable et une mise à jour fiable de ses sites internet.
            Toutefois, des erreurs ou omissions peuvent survenir. L’internaute
            devra donc s’assurer de l’exactitude des informations auprès de Sans
            Croquettes Fixes, et signaler toutes modifications du site qu’il
            jugerait utile. Sans Croquettes Fixes n’est en aucun cas responsable
            de l’utilisation faite de ces informations, et de tout préjudice
            direct ou indirect pouvant en découler.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Cookies : Le site www.sanscroquettesfixes.fr peut-être amené à vous demander
            l’acceptation des cookies pour des besoins de statistiques et
            d’affichage. Un cookie est une information déposée sur votre disque
            dur par le serveur du site que vous visitez. Il contient plusieurs
            données qui sont stockées sur votre ordinateur dans un simple fichier
            texte auquel un serveur accède pour lire et enregistrer des
            informations. Certaines parties de ce site ne peuvent être
            fonctionnelles sans l’acceptation de cookies.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Liens hypertextes : Les sites internet peuvent offrir des liens vers d’autres sites internet
            ou d’autres ressources disponibles sur Internet. L’association Sans
            Croquettes Fixes ne dispose d’aucun moyen pour contrôler les sites en
            connexion avec ses sites internet. Sans Croquettes Fixes ne répond pas
            de la disponibilité de tels sites et sources externes, ni ne la
            garantit. Elle ne peut être tenue pour responsable de tout dommage, de
            quelque nature que ce soit, résultant du contenu de ces sites ou
            sources externes, et notamment des informations, produits ou services
            qu’ils proposent, ou de tout usage qui peut être fait de ces éléments.
            Les risques liés à cette utilisation incombent pleinement à
            l’internaute, qui doit se conformer à leurs conditions d’utilisation.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Services fournis : L’ensemble des activités de l’association ainsi que
            ses informations sont présentées sur notre site
            www.sanscroquettesfixes.fr Sans Croquettes Fixes s’efforce de fournir
            sur le site www.sanscroquettesfixes.fr des informations aussi précises
            que possible. Les renseignements figurant sur le site
            www.sanscroquettesfixes.fr ne sont pas exhaustifs et les photos non
            contractuelles. Ils sont donnés sous réserve de modifications ayant
            été apportées depuis leur mise en ligne. Par ailleurs, toutes les
            informations indiquées sur le site www.sanscroquettesfixes.fr sont
            données à titre indicatif, et sont susceptibles de changer ou
            d’évoluer sans préavis.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Limitations contractuelles sur les données : Les informations contenues sur ce site sont aussi précises que
            possible et le site remis à jour à différentes périodes de l’année,
            mais peuvent toutefois contenir des inexactitudes ou des omissions. Si
            vous constatez une lacune, erreur ou ce qui parait être un
            dysfonctionnement, merci de bien vouloir le signaler par courriel, à
            l’adresse <a href="mailto:contact@sanscroquettesfixes.fr" className="text-[var(--color-primary)] hover:underline">contact@sanscroquettesfixes.fr</a>, en décrivant le problème de
            la manière la plus précise possible (page posant problème, type
            d’ordinateur et de navigateur utilisé, …). Tout contenu téléchargé se
            fait aux risques et périls de l’utilisateur et sous sa seule
            responsabilité. En conséquence, ne serait être tenu responsable d’un
            quelconque dommage subi par l’ordinateur de l’utilisateur ou d’une
            quelconque perte de données consécutives au téléchargement. De plus,
            l’utilisateur du site s’engage à accéder au site en utilisant un
            matériel récent, ne contenant pas de virus et avec un navigateur de
            dernière génération mis-à-jour. Les liens hypertextes mis en place
            dans le cadre du présent site internet en direction d’autres
            ressources présentes sur le réseau Internet ne seraient engager la
            responsabilité de l’association Sans Croquettes Fixes.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Propriété intellectuelle : Tout le contenu du présent site
            www.sanscroquettesfixes.fr , incluant, de façon non limitative, les
            graphismes, images, textes, vidéos, animations, sons, logos, gifs et
            icônes ainsi que leur mise en forme sont la propriété exclusive de la
            société à l’exception des marques, logos ou contenus appartenant à
            d’autres sociétés partenaires ou auteurs. Toute reproduction,
            distribution, modification, adaptation, retransmission ou publication,
            même partielle, de ces différents éléments est strictement interdite
            sans l’accord exprès par écrit de l’association Sans Croquettes Fixes.
            Cette représentation ou reproduction, par quelque procédé que ce soit,
            constitue une contrefaçon sanctionnée par les articles L.335-2 et
            suivants du Code de la propriété intellectuelle. Le non-respect de
            cette interdiction constitue une contrefaçon pouvant engager la
            responsabilité civile et pénale du contrefacteur. En outre, les
            propriétaires des Contenus copiés pourraient intenter une action en
            justice à votre encontre.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Litiges : Les présentes conditions du site www.sanscroquettesfixes.fr sont régies
            par les lois françaises et toute contestation ou litiges qui pourraient
            naître de l’interprétation ou de l’exécution de celles-ci seront de la
            compétence exclusive des tribunaux dont dépend le siège social de la
            société. La langue de référence, pour le règlement de contentieux
            éventuels, est le français.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Données personnelles : De manière générale, vous n’êtes pas tenu de nous communiquer vos données
            personnelles lorsque vous visitez notre site Internet
            www.sanscroquettesfixes.fr Cependant, ce principe comporte certaines
            exceptions. En effet, pour certains services proposés par notre site,
            vous pouvez être amenés à nous communiquer certaines données telles
            que : votre nom, votre fonction, le nom de votre société, votre
            adresse électronique, et votre numéro de téléphone. Tel est le cas
            lorsque vous remplissez le formulaire qui vous est proposé en ligne ou
            bien pour passer commande sur notre boutique en ligne. Dans tous les
            cas, vous pouvez refuser de fournir vos données personnelles. Dans ce
            cas, vous ne pourrez pas utiliser les services du site, notamment
            celui de solliciter des renseignements sur notre société, ou de
            recevoir les lettres d’information. Il en va de même pour la commande
            de produits via notre boutique en ligne. Enfin, nous pouvons collecter
            de manière automatique certaines informations vous concernant lors
            d’une simple navigation sur notre site internet, notamment : des
            informations concernant l’utilisation de notre site, comme les zones
            que vous visitez et les services auxquels vous accédez, votre adresse
            IP, le type de votre navigateur, vos temps d’accès. De telles
            informations sont utilisées exclusivement à des fins de statistiques
            internes, de manière à améliorer la qualité des services qui vous sont
            proposés. Les bases de données sont protégées par les dispositions de
            la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars
            1996 relative à la protection juridique des bases de données.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
