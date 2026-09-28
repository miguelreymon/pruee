import React, { useState } from 'react';
import { ThemeSwitcherBar, AppTheme } from './components/ThemeSwitcherBar';
import { HoopsPulseDashboard } from './components/HoopsPulseDashboard';
import { LucasMartinProfilePage } from './components/LucasMartinProfilePage';
import { WaxPackClubPage } from './components/WaxPackClubPage';
import { GraveyardGearheadsPage } from './components/GraveyardGearheadsPage';
import { ToyProductPage } from './components/ToyProductPage';
import { TopBar } from './components/TopBar';
import { SidebarCategories } from './components/SidebarCategories';
import { HeroSection } from './components/HeroSection';
import { HotToysGrid } from './components/HotToysGrid';
import { FeatureStrips } from './components/FeatureStrips';
import { ShopByCollection } from './components/ShopByCollection';
import { ToyModal } from './components/ToyModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CatalogueRequestModal } from './components/CatalogueRequestModal';
import { GiftFinderModal } from './components/GiftFinderModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { HOT_TOYS, HERO_TOY, ToyItem } from './data/catalogueData';
import { playRetroSound, toggleSound } from './utils/audio';

export default function App() {
  // Theme state: defaults to 'waxpack' as requested by the user for the new recreation
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('waxpack');

  // Dedicated Product Page State
  const [viewingToyProduct, setViewingToyProduct] = useState<ToyItem | null>(null);

  // Nova Play State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { toy: HOT_TOYS[0], quantity: 1 },
  ]);
  const [selectedToy, setSelectedToy] = useState<ToyItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [soundActive, setSoundActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(
    'Wax Pack Club: Baseball. Delivered. Unwrapped loaded with maximum textures!'
  );

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
    showToast(next ? 'Retro Audio FX Enabled' : 'Audio Muted');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAddToCart = (toy: ToyItem, qty: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.toy.id === toy.id);
      if (existing) {
        return prev.map((item) =>
          item.toy.id === toy.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { toy, quantity: qty }];
    });
    showToast(`Added ${toy.name} (${toy.stockCode}) to order!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.toy.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.toy.id !== id));
  };

  const handleQuickOrder = (code: string) => {
    const normalized = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const all = [HERO_TOY, ...HOT_TOYS];
    const match = all.find((t) => {
      const tCode = t.stockCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
      return (
        tCode === normalized ||
        tCode.includes(normalized) ||
        normalized.includes(tCode)
      );
    });

    if (match) {
      handleAddToCart(match, 1);
      showToast(`Quick Order Matched: ${match.name}! Added to cart.`);
    } else {
      handleAddToCart(HOT_TOYS[1], 1);
      showToast(`Code "${code}" processed! Added Turbo Stinger (STK 2210).`);
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#ebe8de] text-slate-900 flex flex-col font-sans">
      {/* Top Switcher Bar between the Pop Culture & Analytics themes */}
      <ThemeSwitcherBar
        currentTheme={currentTheme}
        onSelectTheme={(theme) => {
          setCurrentTheme(theme);
          setViewingToyProduct(null);
          showToast(
            theme === 'hoopspulse'
              ? 'Switched to HOOPSPULSE (Basketball Analytics Dashboard)'
              : theme === 'hoopspulse_player'
              ? 'Switched to LUCAS MARTÍN #23 (Player Profile Analytics)'
              : theme === 'waxpack'
              ? 'Switched to WAX PACK CLUB (Vintage Baseball Cards)'
              : theme === 'gearheads'
              ? 'Switched to GRAVEYARD GEARHEADS (Lowbrow Hot Rod Cult)'
              : 'Switched to NOVA PLAY (1985 Toy Catalogue)'
          );
        }}
      />

      {/* RENDER VIEW ACCORDING TO SELECTED PAGE */}
      {currentTheme === 'hoopspulse' ? (
        <HoopsPulseDashboard
          onNavigateToPlayer={() => setCurrentTheme('hoopspulse_player')}
          onShowToast={showToast}
        />
      ) : currentTheme === 'hoopspulse_player' ? (
        <LucasMartinProfilePage
          onBackToDashboard={() => setCurrentTheme('hoopspulse')}
          onShowToast={showToast}
        />
      ) : currentTheme === 'waxpack' ? (
        <WaxPackClubPage
          onShowToast={showToast}
          onSwitchTheme={(theme) => setCurrentTheme(theme as AppTheme)}
        />
      ) : currentTheme === 'gearheads' ? (
        <GraveyardGearheadsPage
          onShowToast={showToast}
          onSwitchToNovaPlay={() => setCurrentTheme('novaplay')}
        />
      ) : (
        <>
          {/* EITHER DEDICATED PRODUCT PAGE OR CATALOGUE SPREAD */}
          {viewingToyProduct ? (
            <>
              <TopBar
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                soundEnabled={soundActive}
                onToggleSound={handleToggleSound}
                onShowToast={showToast}
              />
              <ToyProductPage
                toy={viewingToyProduct}
                onBack={() => setViewingToyProduct(null)}
                onAddToCart={handleAddToCart}
                onInspectOtherToy={(t) => setViewingToyProduct(t)}
                onShowToast={showToast}
              />
            </>
          ) : (
            <main className="flex-1 max-w-[1440px] w-full mx-auto p-3 sm:p-4 lg:p-5">
              {activeCategory !== 'all' && (
                <div className="mb-3 bg-[#ffdf00] border-2 border-black p-3 flex items-center justify-between shadow-[3px_3px_0_#000]">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs uppercase text-black">
                      FILTER ACTIVE: {activeCategory.toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      (Showing curated vintage catalogue items)
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      playRetroSound('click');
                      setActiveCategory('all');
                      showToast('Filter cleared, showing full catalogue');
                    }}
                    className="btn-retro-white text-[11px] font-black uppercase px-2.5 py-0.5"
                  >
                    SHOW ALL
                  </button>
                </div>
              )}

              {/* Main Catalogue Layout: Left Sidebar + Right Multi-Row Section */}
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start">
                {/* Left Sidebar: Logo, Categories, Catalogue Quick Order */}
                <SidebarCategories
                  activeCategory={activeCategory}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                  onQuickOrder={handleQuickOrder}
                  onShowToast={showToast}
                />

                {/* Right Area: TopBar, Hero + Hot Toys, FeatureStrips, Collections */}
                <div className="flex-1 flex flex-col gap-3 min-w-0 w-full">
                  {/* Top Bar for Delivery / Perks / Sign In / Cart */}
                  <TopBar
                    cartCount={totalCartCount}
                    onOpenCart={() => setIsCartOpen(true)}
                    onOpenAuth={() => setIsAuthModalOpen(true)}
                    soundEnabled={soundActive}
                    onToggleSound={handleToggleSound}
                    onShowToast={showToast}
                  />

                  {/* Row 1: Hero (Stormhawk Jet) + Hot Toys Right Now (3x2 grid with 6 cards) */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch">
                    <div className="xl:col-span-6 flex flex-col min-w-0">
                      <HeroSection
                        onInspectToy={(toy) => setSelectedToy(toy)}
                        onAddToCart={(toy) => handleAddToCart(toy)}
                        onShowToast={showToast}
                      />
                    </div>

                    <div className="xl:col-span-6 flex flex-col min-w-0">
                      <HotToysGrid
                        onInspectToy={(toy) => setSelectedToy(toy)}
                        onAddToCart={(toy) => handleAddToCart(toy)}
                        onShowToast={showToast}
                      />
                    </div>
                  </div>

                  {/* Row 2: FeatureStrips (NEW ARRIVALS, GIFT FINDER, REQUEST A CATALOGUE, STAY IN THE LOOP!) */}
                  {/* DIRECTLY UNDER HERO & HOT TOYS, MATCHING THE IMAGE EXACTLY */}
                  <FeatureStrips
                    onFilterNew={() => {
                      setActiveCategory('robots');
                    }}
                    onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
                    onRequestCatalogue={() => setIsCatalogueModalOpen(true)}
                    onShowToast={showToast}
                  />

                  {/* Row 3: Shop by Collection + Why Shop with Nova Play */}
                  <ShopByCollection
                    onSelectCollection={(colId) => {
                      showToast(`Collection ${colId.toUpperCase()} selected!`);
                      const matched = HOT_TOYS.find(
                        (t) =>
                          t.category ===
                          (colId === 'mega-robots'
                            ? 'robots'
                            : colId === 'speed-machines'
                            ? 'vehicles'
                            : 'games')
                      );
                      if (matched) setSelectedToy(matched);
                    }}
                    onShowToast={showToast}
                  />
                </div>
              </div>
            </main>
          )}

          <Footer
            onShowToast={showToast}
            onRequestCatalogue={() => setIsCatalogueModalOpen(true)}
          />

          <ToyModal
            toy={selectedToy}
            onClose={() => setSelectedToy(null)}
            onAddToCart={(toy, qty) => handleAddToCart(toy, qty)}
            onOpenFullPage={(toy) => {
              setSelectedToy(null);
              setViewingToyProduct(toy);
              showToast(`Opened dedicated page for ${toy.name}!`);
            }}
          />

          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onShowToast={showToast}
          />

          <CatalogueRequestModal
            isOpen={isCatalogueModalOpen}
            onClose={() => setIsCatalogueModalOpen(false)}
            onShowToast={showToast}
          />

          <GiftFinderModal
            isOpen={isGiftFinderOpen}
            onClose={() => setIsGiftFinderOpen(false)}
            onInspectToy={(toy) => setSelectedToy(toy)}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onShowToast={showToast}
          />
        </>
      )}

      {/* Tactile Toast Notification */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}

