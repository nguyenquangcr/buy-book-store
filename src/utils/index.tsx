export function showPopup() {
  ((document.querySelector('[id="js-popup"]'))as any).classList.add('active');
}

export function closePopup() {
  const content : any = document.querySelector('[id="js-popup"]');
  content.classList.remove('active');
  if (content.classList.contains('popup-update'))
    content.classList.remove('popup-update');
  document
    .querySelectorAll('[id="js-popup-update-not-change"]')
    .forEach(el => {
      el.classList.remove('popup-update-not-change');
    });
}

export function showPopupDelete() {
  (document.querySelector('[id="js-popup-delete"]') as any).classList.add('active');
}

export function closePopupDelete() {
  const content: any = document.querySelector('[id="js-popup-delete"]');
  content.classList.remove('active');
  if (content.classList.contains('popup-update'))
    content.classList.remove('popup-update');
  document.querySelectorAll('[id="js-popup-delete-update-not-change"]').forEach(el => {
    el.classList.remove('popup-update-not-change');
  });
}


export const random = (number:number) => {
  try {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < number; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  } catch (error) {
    //
  }
};