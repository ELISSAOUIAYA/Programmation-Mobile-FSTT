import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

// URL de l'image de bannière
const BANNER_URL = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800';

// Données des destinations 
const DATA = [
  { id: '1', destination: 'Londres', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', pays: 'Royaume-Uni' },
  { id: '2', destination: 'Tokyo', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400', pays: 'Japon' },
  { id: '3', destination: 'Santorin', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400', pays: 'Grèce' },
  { id: '4', destination: 'Cappadoce', image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=400', pays: 'Turquie' },
];

export default function App() {
  
  // Composant pour afficher chaque destination
  const DestinationItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      
      <View style={styles.cardInfo}>
       // Alignement du titre et du badge sur la même ligne
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{item.destination}</Text>
          
          // affichage du badge "Top" pour les destinations populaires
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Populaire</Text>
          </View>
        </View>
        
        <Text style={styles.cardCountry}>{item.pays}</Text>
      </View>
    </View>
  );

  //  Utilisation de FlatList pour afficher les destinations
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DestinationItem item={item} />}
        ListHeaderComponent={
          <>
            <Image source={{ uri: BANNER_URL }} style={styles.bannerImage} />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>Explorez de Nouveaux Horizons</Text>
              <Text style={styles.description}>
                Trouvez les meilleures destinations pour vos prochaines vacances.
              </Text>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bannerImage: {
    width: '100%',
    height: 255,
  },
  textWrapper: {
    padding: 22,
    alignItems: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },

 // Styles pour les cartes de destination
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardInfo: {
    padding: 15, 
  },

 // Styles pour aligner le titre et le badge sur la même ligne
  cardHeaderRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardCountry: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
  },

  // Style du badge 
  badge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  badgeText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: 'bold',
  },
});